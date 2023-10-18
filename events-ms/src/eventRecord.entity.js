import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity(`events`)
export class EventRecord {
  @PrimaryGeneratedColumn()
  id;

  @Column({ type: 'numeric' })
  userId;

  @Column({ type: 'varchar', length: 15 })
  eventType;

  @Column({ type: 'timestamp' })
  eventTime;
}
