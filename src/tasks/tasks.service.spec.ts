import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Task } from './task.entity'
import { TasksService } from './tasks.service'
import { Repository } from 'typeorm'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'

const taskArray = [
  {
    id: 1,
    name: 'work out',
    isCompleted: false,
  },
  {
    id: 2,
    name: 'read books',
    isCompleted: false,
  },
]

const oneTask = {
  id: 1,
  name: 'work out',
  isCompleted: false,
}

const deleteResult = { raw: [], affected: 1 }

const createTaskDto: CreateTaskDto = {
  name: 'work out',
}

const updateTaskDto: UpdateTaskDto = {
  name: 'work out',
  isCompleted: true,
}

const updatedTask = {
  id: 1,
  name: 'work out',
  isCompleted: true,
}

describe('TasksService', () => {
  let service: TasksService
  let repository: Repository<Task>

  // それぞれのテストの前にモジュールを作成
  // Repository関数のモック化
  // 非同期関数が返す値をモック化するときにはmockResolvedValue()
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useValue: {
            save: jest.fn().mockResolvedValue(oneTask),
            find: jest.fn().mockResolvedValue(taskArray),
            findOne: jest.fn().mockResolvedValue(oneTask),
            delete: jest.fn().mockResolvedValue(deleteResult),
          },
        },
      ],
    }).compile()

    service = module.get<TasksService>(TasksService)
    repository = module.get<Repository<Task>>(getRepositoryToken(Task))
  })

  // serviceが定義されているかを確認
  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  /*
    まず、jest.spyOn() を使って先ほど定義したモック関数を呼び出しています。
    次に、TasksService の create() が正しい値を返すかをテストします。この時、モック化した save() が呼び出されています。
    最後に、モック化した save() が想定した引数で呼び出されたかをテストします。
  */
  describe('create()', () => {
    it('should insert a task', () => {
      // モック化した関数を用意
      // 今回使うモック関数は、save() なので spyOn の第二引数を 'save' としている
      const repoSpy = jest.spyOn(repository, 'save')
      // TasksService の create() をテスト
      // oneTask が返ってくるかテスト
      //.resolves とすることで、JEST は promise が解決するまで待機してくれます。
      //その後、.toEqual(oneTask) とすると、promise が解決し、返ってきた結果が oneTask と等しいかどうかを検証することができます。
      expect(service.create(createTaskDto)).resolves.toEqual(oneTask)
      // モック化した関数が想定した引数で呼び出されたかをテスト
      // create() を呼び出したときにモック化した save() がきちんと呼び出されているかどうかを確認する
      // toBeCalledWith() を使うことで、呼び出された際の引数も一緒にテストすることができます。
      expect(repoSpy).toBeCalledWith(createTaskDto)
    })
  })

  describe('findAll()', () => {
    it('should get an array of tasks', async () => {
      const repoSpy = jest.spyOn(repository, 'find')
      expect(service.findAll()).resolves.toEqual(taskArray)
      expect(repoSpy).toBeCalled()
    })
  })

  describe('findOne()', () => {
    /*
      モック化した関数を呼び出す（今回は findOne()）
      TasksService の findOne() が期待通りの値を返すかテストする
      モック化した関数が適切に呼び出されたかテストする
     */
    it('should get a task', () => {
      const repoSpy = jest.spyOn(repository, 'findOne')
      expect(service.findOne('1')).resolves.toEqual(oneTask)
      expect(repoSpy).toBeCalledWith({ where: { id: 1 } })
    })
  })

  /**
   * update()で呼び出されるRepositoryの関数はsave()とfindOne()であり、
   * 以前にテストしたのでそこは省略
   */
  describe('update()', () => {
    it('should update a task', () => {
      expect(service.update('1', updateTaskDto)).resolves.toEqual(updatedTask)
    })
  })

  /**
    モック化した関数を呼び出す（今回は delete()）
    TasksService の delete() が期待通りの値を返すかテストする
    モック化した関数が適切に呼び出されたかテストする
   */
  describe('delete()', () => {
    it('should delete a task', async () => {
      const repoSpy = jest.spyOn(repository, 'delete')
      expect(service.delete('1')).resolves.toEqual(deleteResult)
      expect(repoSpy).toBeCalledWith('1')
    })
  })
})
