let stock: number[] = [15, 8, 20, 5, 30];

function getRestockList(inventory: number[]): number[] {
    const restockList: number[] = [];
    
    for (const quantity of inventory) {
        if (quantity < 10) {
            restockList.push(quantity);
        }
    }
    
    return restockList;
}

const result: number[] = getRestockList(stock);
console.log(result);