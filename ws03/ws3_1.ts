function calculateArea(width: number, height: number): number {
    return width * height;
}

const showResult = (result: number): void => {
    console.log(`The result is: ${result}`);
};

const area: number = calculateArea(10, 5);
showResult(area);