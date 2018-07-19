export class Departure {
    name: string;
    direction: string;
    time: string;
    date: string;
    // initailize with default value because rtTime and rtDate are not always defined in response
    rtTime = '-';
    rtDate = '-';
}

