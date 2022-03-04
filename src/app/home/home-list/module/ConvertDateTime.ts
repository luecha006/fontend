export class ConvertDateTime{

  DateToFormatSring(date_string: any): string {
        const date_format = new Date(date_string);
        return date_format.toLocaleDateString("en-GB", { timeZone: "Asia/Bangkok" });
    }
}
