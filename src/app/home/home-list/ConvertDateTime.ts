export class ConvertDateTime{
    StringToDate(date_string: any): string {
        console.log(date_string);
        const date_format = new Date(date_string);
        return date_format.toLocaleDateString("en-GB", { timeZone: "Asia/Bangkok" });
    }

    DateToFormatSring() {
        return "Hello DateToFormatSring";
    }
}