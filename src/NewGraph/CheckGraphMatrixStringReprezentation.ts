export default function CheckGraphMatrixStringReprezentation(text: string) {
  if (text.length === 0) {
    return 'Macierz musi zawierać min 1 wierzchołek'
  }

  try {
    const obj: any = JSON.parse(text)

    if (!Array.isArray(obj)) {
      return 'JSON: Macierz musi być dwuwymiarową tablicą liczb (number[][])'
    }

    const length = obj.length

    for (const sub of obj) {
      if (!Array.isArray(sub)) {
        return 'JSON: Macierz musi być dwuwymiarową tablicą liczb'
      }

      if (sub.length !== length) {
        return 'JSON: Macierz musi być dwuwymiarową kwadratową tablicą liczb'
      }

      for (const nb of sub) {
        const val = parseInt(nb)

        if (Number.isNaN(val)) {
          return 'JSON: Macierz musi być dwuwymiarową tablicą liczb'
        }

        if (val !== 0 && val !== 1) {
          return 'Wartości macierzy mogą być tylko 0 lub 1'
        }
      }
    }
  } catch {
    return 'Macierz w nieprawidłowym formacie'
  }

  return null
}
