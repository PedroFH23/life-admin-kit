# life-admin-kit

Minimal headless library to manage tasks, reminders and daily summaries.

## Installation

Clone the repository or copy the modules into your project.

## Usage

```js
import { createLifeAdminKit } from 'life-admin-kit';

const kit = createLifeAdminKit();

kit.tasks.create({ title: 'Pay bill' });

console.log(kit.tasks.getAll());
console.log(kit.summary.getTodaySummary());
```

## Modules

- TaskService
- ReminderService
- DailySummaryService
- MemoryStorage
- FileStorage
- createLifeAdminKit
- exportToJson
- importFromJson
- exportKitData
- importKitData

## Features

- Task management
- Reminder management
- Daily summary generation
- Memory storage
- File storage
- JSON export/import
- Kit factory helper

## Run tests

```bash
npm test
```
