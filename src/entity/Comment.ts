import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import {User} from './User';
import {Post} from './Post';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column('text')
  content: string;
  @ManyToOne('User', 'comments')
  user: User;
  @ManyToOne('Post', 'comments')
  post: Post;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
