# life-admin-kit

Minimal headless library to manage tasks, reminders and daily summaries.

## Installation

Clone the repo or copy the modules.

## Usage

```js
import {
  TaskService,
  ReminderService,
  DailySummaryService,
  MemoryStorage
} from './src/index.js';

const tasks = new TaskService(new MemoryStorage());
const reminders = new ReminderService(new MemoryStorage());
const summary = new DailySummaryService(tasks, reminders);

tasks.create({ title: 'Pay bill' });

console.log(tasks.getAll());
console.log(summary.getTodaySummary());
``` 

## Modules
- TaskService
- ReminderService
- DailySummaryService
- MemoryStorage

## Run Tests

npm test