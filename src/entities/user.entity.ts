import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: '用户名,用于登录,唯一',
  })
  username: string;

  @Column({
    comment: '邮箱,可用于登录,唯一',
  })
  email: string;

  @Column({
    comment: '密码',
  })
  password: string;

  @Column({
    comment: '用户昵称',
  })
  nickname: string;

  @Column({
    default: true,
    comment: '是否启用该账号',
  })
  isActive: boolean;

  @CreateDateColumn({
    comment: '账号创建时间',
  })
  createTime: Date;

  @UpdateDateColumn({
    comment: '账号最近一次修改时间',
  })
  updateTime: Date;
}
