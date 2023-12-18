export class TopService {
  static async get(path: string) {
    try {
      let x = await fetch(`https://xeleos.ddns.net/api${path}`);
      const values = (await x.json()) as Record<any, any>[];
      for (let i = 0; i < values.length; i++) {
        let value = values[i];
        value.__index = i + 1;
      }

      return values;
    } catch (e) {
      return "Ошибка при получении данных.";
    }
  }
}
