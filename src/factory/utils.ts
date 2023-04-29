export class Utils {
  constructor() {}
  // Return Date Calculator
  returnDateCalculator(
    creationDate: Date,
    durationStr: string,
  ): { returnDate: number } {
    // Extract duration delimter (d / m / y)
    const delimter = durationStr.slice(
      durationStr.length - 1,
      durationStr.length,
    );

    // console.log(creationDate);

    // Extract duration number
    const durationNum = +durationStr.slice(0, durationStr.length - 1);

    // Calculate the return data
    switch (delimter) {
      case 'd': {
        const duration = creationDate.setDate(
          creationDate.getDate() + durationNum,
        );
        return { returnDate: new Date(duration).setHours(0, 0, 0, 0) };
      }

      case 'm': {
        const duration = creationDate.setMonth(
          creationDate.getMonth() + durationNum,
        );
        return { returnDate: new Date(duration).setHours(0, 0, 0, 0) };
      }

      case 'y': {
        const duration = creationDate.setFullYear(
          creationDate.getFullYear() + durationNum,
        );
        // console.log(new Date(duration), durationStr);
        return { returnDate: new Date(duration).setHours(0, 0, 0, 0) };
      }
    }
  }
}
