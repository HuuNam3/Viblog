import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
  status: number;
}

export class ApiHandler {
  private static async readJsonFile<T>(filePath: string): Promise<T> {
    try {
      const fullPath = path.join(process.cwd(), filePath);
      const data = await fs.readFile(fullPath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error(`Error reading file ${filePath}:`, error);
      throw new Error('Failed to read data');
    }
  }

  private static async writeJsonFile<T>(filePath: string, data: T): Promise<void> {
    try {
      const fullPath = path.join(process.cwd(), filePath);
      await fs.writeFile(fullPath, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(`Error writing file ${filePath}:`, error);
      throw new Error('Failed to write data');
    }
  }

  private static createResponse<T>(response: ApiResponse<T>): NextResponse {
    return NextResponse.json(
      {
        data: response.data,
        error: response.error,
        message: response.message
      },
      {
        status: response.status,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=59'
        }
      }
    );
  }

  static async handleGet<T>(
    filePath: string,
    options?: {
      filter?: (item: T) => boolean;
      transform?: (data: T) => any;
      pagination?: {
        page: number;
        limit: number;
      };
    }
  ): Promise<NextResponse> {
    try {
      let data = await this.readJsonFile<T[]>(filePath);

      if (options?.filter) {
        data = data.filter(options.filter);
      }

      if (options?.pagination) {
        const { page, limit } = options.pagination;
        const start = (page - 1) * limit;
        const end = start + limit;
        const totalItems = data.length;
        const totalPages = Math.ceil(totalItems / limit);

        data = data.slice(start, end);

        return this.createResponse({
          data: {
            items: options.transform ? data.map(options.transform) : data,
            pagination: {
              currentPage: page,
              totalPages,
              totalItems,
              itemsPerPage: limit
            }
          },
          status: 200
        });
      }

      return this.createResponse({
        data: options?.transform ? data.map(options.transform) : data,
        status: 200
      });
    } catch (error) {
      console.error('GET request error:', error);
      return this.createResponse({
        error: 'Failed to fetch data',
        status: 500
      });
    }
  }

  static async handlePost<T>(
    filePath: string,
    newData: Partial<T>,
    options?: {
      validate?: (data: Partial<T>) => boolean | string;
      transform?: (data: T) => any;
      generateId?: (existingData: T[]) => number | string;
    }
  ): Promise<NextResponse> {
    try {
      if (options?.validate) {
        const validationResult = options.validate(newData);
        if (validationResult !== true) {
          return this.createResponse({
            error: typeof validationResult === 'string' ? validationResult : 'Validation failed',
            status: 400
          });
        }
      }

      const existingData = await this.readJsonFile<T[]>(filePath);
      
      const id = options?.generateId 
        ? options.generateId(existingData)
        : (existingData.length > 0 ? Math.max(...existingData.map((item: any) => item.id)) + 1 : 1);

      const dataToSave = { ...newData, id } as T;
      existingData.push(dataToSave);
      
      await this.writeJsonFile(filePath, existingData);

      return this.createResponse({
        data: options?.transform ? options.transform(dataToSave) : dataToSave,
        message: 'Data created successfully',
        status: 201
      });
    } catch (error) {
      console.error('POST request error:', error);
      return this.createResponse({
        error: 'Failed to create data',
        status: 500
      });
    }
  }

  static async handlePut<T extends { id: number | string }>(
    filePath: string,
    id: number | string,
    updateData: Partial<T>,
    options?: {
      validate?: (data: Partial<T>) => boolean | string;
      transform?: (data: T) => any;
    }
  ): Promise<NextResponse> {
    try {
      if (options?.validate) {
        const validationResult = options.validate(updateData);
        if (validationResult !== true) {
          return this.createResponse({
            error: typeof validationResult === 'string' ? validationResult : 'Validation failed',
            status: 400
          });
        }
      }

      const data = await this.readJsonFile<T[]>(filePath);
      const index = data.findIndex(item => item.id === id);

      if (index === -1) {
        return this.createResponse({
          error: 'Item not found',
          status: 404
        });
      }

      const updatedItem = { ...data[index], ...updateData };
      data[index] = updatedItem;
      
      await this.writeJsonFile(filePath, data);

      return this.createResponse({
        data: options?.transform ? options.transform(updatedItem) : updatedItem,
        message: 'Data updated successfully',
        status: 200
      });
    } catch (error) {
      console.error('PUT request error:', error);
      return this.createResponse({
        error: 'Failed to update data',
        status: 500
      });
    }
  }

  static async handleDelete<T extends { id: number | string }>(
    filePath: string,
    id: number | string
  ): Promise<NextResponse> {
    try {
      const data = await this.readJsonFile<T[]>(filePath);
      const index = data.findIndex(item => item.id === id);

      if (index === -1) {
        return this.createResponse({
          error: 'Item not found',
          status: 404
        });
      }

      data.splice(index, 1);
      await this.writeJsonFile(filePath, data);

      return this.createResponse({
        message: 'Data deleted successfully',
        status: 200
      });
    } catch (error) {
      console.error('DELETE request error:', error);
      return this.createResponse({
        error: 'Failed to delete data',
        status: 500
      });
    }
  }
} 