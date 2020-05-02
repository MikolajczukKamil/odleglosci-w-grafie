export default class BFSState {
  constructor(
    private queue: number[],
    private visited: boolean[],
    private distance: number[]
  ) {}

  public get Queue() {
    return this.queue.slice(0)
  }

  public get Visited() {
    return this.visited.slice(0)
  }

  public get Distance() {
    return this.distance.slice(0)
  }
}
