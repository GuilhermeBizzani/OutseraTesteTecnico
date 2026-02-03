import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

/**
 * Movie entity representing the movies table
 */
@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  year: number;

  @Column()
  title: string;

  @Column()
  studios: string;

  @Column()
  producers: string;

  @Column({ default: false })
  winner: boolean;
}

/**
 * Movie data transfer object for CSV parsing
 */
export interface MovieDTO {
  year: string;
  title: string;
  studios: string;
  producers: string;
  winner: string;
}
