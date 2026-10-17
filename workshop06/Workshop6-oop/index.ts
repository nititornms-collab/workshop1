// Workshop 6.1: Smart Employee
class Employee {
  private _firstName: string;
  private _lastName: string;

  constructor(firstName: string, lastName: string) {
    this._firstName = firstName;
    this._lastName = lastName;
  }

  get fullName(): string {
    return `${this._firstName} ${this._lastName}`;
  }

  set fullName(value: string) {
    const parts = value.trim().split(/\s+/);

    if (parts.length < 2 || parts.some((part) => part.length === 0)) {
      throw new Error("Please enter both first name and last name.");
    }

    this._firstName = parts[0];
    this._lastName = parts.slice(1).join(" ");
  }
}

// Test Employee getter and setter.
const employee = new Employee("John", "Doe");
console.log(`Employee full name: ${employee.fullName}`);

employee.fullName = "Jane Smith";
console.log(`Updated full name: ${employee.fullName}`);

// Workshop 6.2: Temperature
class WeatherStation {
  private _celsius: number;

  constructor(celsius: number) {
    if (celsius < -273.15) {
      throw new Error("Temperature cannot be below Absolute Zero (-273.15°C).");
    }
    this._celsius = celsius;
  }

  get fahrenheit(): number {
    return (this._celsius * 9) / 5 + 32;
  }

  set fahrenheit(value: number) {
    if (value < -459.67) {
      throw new Error("Temperature cannot be below Absolute Zero (-459.67°F).");
    }
    this._celsius = ((value - 32) * 5) / 9;
  }

  // Optional getter to make the stored Celsius value easy to inspect.
  get celsius(): number {
    return this._celsius;
  }
}

// Test WeatherStation getter, setter, and validation.
const weather = new WeatherStation(25);
console.log(`Temperature: ${weather.celsius.toFixed(2)}°C`);
console.log(`Fahrenheit: ${weather.fahrenheit.toFixed(2)}°F`);

weather.fahrenheit = 86;
console.log(`After setting Fahrenheit to 86°F: ${weather.celsius.toFixed(2)}°C`);

try {
  weather.fahrenheit = -500;
} catch (error) {
  console.log(error instanceof Error ? error.message : error);
}
