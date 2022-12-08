import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ default: false })
  isCompleted: boolean
}
