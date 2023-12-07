export class TopService {
  static async get(path: string): Promise<object[] | string> {
    try {
      let x = await fetch(`https://xeleos.ddns.net/api${path}`);
      return await x.json();
    } catch (e) {
      return "Ошибка при получении данных.";
    }
  }
}
