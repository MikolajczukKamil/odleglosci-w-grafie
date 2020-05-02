interface ICode {
  id: number
  content: string
  indentation: number
}

const code: ICode[] = [
  [0, '// Inicjalizacja wartości'],
  [0, '// Odwiedzone[...] = NIE'],
  [0, '// Odległość[...] = Nieskończoność'],
  [0, '// Kolejka = Pusta'],
  [0, 'Odwiedzone[Startowy] = TAK'],
  [0, 'Odległość[Startowy] = 0'],
  [0, 'Kolejka.Wstaw(Startowy)'],
  [0, 'Dopuki Kolejka nie jest pusta'],
  [1, 'Pierwszy = Kolejka.Następny()'],
  [1, "Dla każdego Sąsiad'a wierzchołka Pierwszy"],
  [2, 'Jeżeli Sąsiad nie jest odwiedzony'],
  [3, '// Odwiedzamy wierzchołek Sąsiad'],
  [3, 'Odwiedzone[Sąsiad] = TAK'],
  [3, '// Odległość do Sąsiada = Odległosć do Pierwszego + 1'],
  [3, 'Odległość[Sąsiad] = Odległosć[Pierwszy] + 1'],
  [3, 'Kolejka.Wstaw(Sąsiad)'],
  [1, 'Odwiedzone[Pierwszy] = TAK'],
].map(([indentation, content], id) => ({ id, content, indentation }) as ICode)

export class BFSAlgorythm {
  constructor(
    private graph: number[][],
    private start: number,
    private step = 1
  ) {}
}
