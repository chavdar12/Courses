# SoftUni Entity Framework Core

Solutions for the SoftUni Entity Framework Core course: ADO.NET, a hand-made ORM, EF Core database-first and code-first,
relations, LINQ and advanced querying, AutoMapper, JSON / XML import and export, and a layered architecture exercise.
Every lecture folder is its own solution (`NNN-Lecture/NNN-Lecture.slnx`) with tests.

## Lectures

| #   | Lecture | Exercises |
| --- | ------- | --------- |
| 002 | Exercise: ADO.NET | [MinionsDB with ADO.NET](002-Exercise-Ado.Net/MinionsDb): Villain Names · Minion Names · Add Minion · Change Town Names Casing · Remove Villain · Print All Minion Names · Increase Minion Age · Increase Age Stored Procedure |
| 004 | Exercise: ORM Fundamentals | [MiniORM](004-Exercise-Orm-Fundamentals/MiniORM): reflection-based `DbContext` / `DbSet` with change tracking · [demo app](004-Exercise-Orm-Fundamentals/MiniORM.App) |
| 006 | Exercise: Entity Framework Introduction | [SoftUni](006-Exercise-Entity-Framework-Introduction/SoftUni): Get Employees Full Information · Get Employees With Salary Over 50000 · Get Employees From Research And Development · Add New Address To Employee · Get Employees In Period · Get Addresses By Town · Get Employee 147 · Get Departments With More Than 5 Employees · Get Latest Projects · Increase Salaries · Get Employees By First Name Starting With Sa · Delete Project By Id · Remove Town |
| 008 | Exercise: Entity Relations | [Student System](008-Exercise-Entity-Relations/P01_StudentSystem) · [Football Betting](008-Exercise-Entity-Relations/P03_FootballBetting) ([data](008-Exercise-Entity-Relations/P03_FootballBetting.Data), [models](008-Exercise-Entity-Relations/P03_FootballBetting.Data.Models)) – code-first models and relations |
| 010 | Exercise: LINQ | [Music Hub](010-Exercise-Linq/MusicHub): Export Albums Info · Export Songs Above Duration |
| 012 | Exercise: Advanced Querying | [Book Shop](012-Exercise-Advanced-Querying/BookShop): Get Books By Age Restriction · Get Golden Books · Get Books By Price · Get Books Not Released In · Get Books By Category · Get Books Released Before · Get Author Names Ending In · Get Book Titles Containing · Get Books By Author · Count Books · Count Copies By Author · Get Total Profit By Category · Get Most Recent Books · Increase Prices · Remove Books |
| 014 | Exercise: C# Auto Mapping Objects | [Fast Food](014-Exercise-Csharp-Auto-Mapping-Objects/FastFood): ASP.NET Core MVC app – categories, employees, items, orders, positions mapped with AutoMapper |
| 016 | Exercise: JSON Processing | [Product Shop](016-Exercise-Json-Processing/ProductShop): Import Users · Import Products · Import Categories · Import Category Products · Get Products In Range · Get Sold Products · Get Categories By Products Count · Get Users With Products<br>[Car Dealer](016-Exercise-Json-Processing/CarDealer): Import Suppliers · Import Parts · Import Cars · Import Customers · Import Sales · Get Ordered Customers · Get Cars From Make Toyota · Get Local Suppliers · Get Cars With Their List Of Parts · Get Total Sales By Customer · Get Sales With Applied Discount |
| 018 | Exercise: XML Processing | [Product Shop](018-Exercise-Xml-Processing/ProductShop): Import Users · Import Products · Import Categories · Import Category Products · Get Products In Range · Get Sold Products · Get Categories By Products Count · Get Users With Products<br>[Car Dealer](018-Exercise-Xml-Processing/CarDealer): Import Suppliers · Import Parts · Import Cars · Import Customers · Import Sales · Get Cars With Distance · Get Cars From Make BMW · Get Local Suppliers · Get Cars With Their List Of Parts · Get Total Sales By Customer · Get Sales With Applied Discount |
| 020 | Exercise: Best Practices and Architecture | [Pet Store](020-Exercise-Best-Practices-And-Architecture): layered [data](020-Exercise-Best-Practices-And-Architecture/PetStore.Data) + [services](020-Exercise-Best-Practices-And-Architecture/PetStore.Services) – pets, products, clients, grooming salon, reports |

## Run

Needs the .NET 10 SDK. The database exercises connect to SQL Server on `localhost,1433` (`sa` user):

```bash
docker run -e ACCEPT_EULA=Y -e MSSQL_SA_PASSWORD='YourStrong!Passw0rd' -p 1433:1433 -d mcr.microsoft.com/mssql/server:2022-latest
dotnet test 012-Exercise-Advanced-Querying/012-Exercise-Advanced-Querying.slnx
```

## License

[MIT](LICENSE)

## Course materials

Slides, task sheets and lecture videos for each lesson.

| Lesson | Materials | Video |
| ------ | --------- | ----- |
| 001-Ado.Net | — | [Video](https://youtu.be/CM-WA6I2J-o) |
| [002-Exercise-Ado.Net](002-Exercise-Ado.Net) | [Ado-Net-Exercises.pdf](002-Exercise-Ado.Net/Resources/Ado-Net-Exercises.pdf) · [Ado-Net.pdf](002-Exercise-Ado.Net/Resources/Ado-Net.pdf) · [Csharp-Asp-Net-Core-Course-Introduction-Project-Assignment-Date-.pdf](002-Exercise-Ado.Net/Resources/Csharp-Asp-Net-Core-Course-Introduction-Project-Assignment-Date-.pdf) · [Db-Advanced-Course-Introduction.pdf](002-Exercise-Ado.Net/Resources/Db-Advanced-Course-Introduction.pdf) | [Video](https://youtu.be/eOcwBL3MUD8) |
| 003-Orm-Fundamentals | — | [Video](https://youtu.be/63WO4A7TRhY) |
| [004-Exercise-Orm-Fundamentals](004-Exercise-Orm-Fundamentals) | [Orm-Fundamentals-Miniorm-Exercise.pdf](004-Exercise-Orm-Fundamentals/Resources/Orm-Fundamentals-Miniorm-Exercise.pdf) · [Orm-Fundamentals.pdf](004-Exercise-Orm-Fundamentals/Resources/Orm-Fundamentals.pdf) | [Video](https://youtu.be/ZGym70dIHo0) |
| 005-Entity-Framework-Introduction | — | [Video](https://youtu.be/FV_AlWkEyK0) |
| [006-Exercise-Entity-Framework-Introduction](006-Exercise-Entity-Framework-Introduction) | [Entity-Framework-Introduction-Exercises.pdf](006-Exercise-Entity-Framework-Introduction/Resources/Entity-Framework-Introduction-Exercises.pdf) · [Entity-Framework-Introduction.pdf](006-Exercise-Entity-Framework-Introduction/Resources/Entity-Framework-Introduction.pdf) | [Video](https://youtu.be/Rh-93Pzq-Hk) |
| 007-Entity-Relations | — | [Video](https://youtu.be/GcGqZQxVmWk) |
| [008-Exercise-Entity-Relations](008-Exercise-Entity-Relations) | [Entity-Relations-Exercises.pdf](008-Exercise-Entity-Relations/Resources/Entity-Relations-Exercises.pdf) · [Entity-Relations.pdf](008-Exercise-Entity-Relations/Resources/Entity-Relations.pdf) | [Video](https://youtu.be/-1mYP-tguXU) |
| 009-Linq | — | [Video](https://youtu.be/C6dLHE0W6oE) |
| [010-Exercise-Linq](010-Exercise-Linq) | [Linq-Exercises.pdf](010-Exercise-Linq/Resources/Linq-Exercises.pdf) · [Linq.pdf](010-Exercise-Linq/Resources/Linq.pdf) | [Video](https://youtu.be/CFxOP7eoK44) |
| 011-Advanced-Querying | — | [Video](https://youtu.be/3LXs90PkoNo) |
| [012-Exercise-Advanced-Querying](012-Exercise-Advanced-Querying) | [Advanced-Querying-Exercises.pdf](012-Exercise-Advanced-Querying/Resources/Advanced-Querying-Exercises.pdf) · [Advanced-Querying.pdf](012-Exercise-Advanced-Querying/Resources/Advanced-Querying.pdf) | [Video](https://youtu.be/IRp3SkEu5Wo) |
| 013-Csharp-Auto-Mapping-Objects | — | [Video](https://youtu.be/WBjyBSQO5G8) |
| [014-Exercise-Csharp-Auto-Mapping-Objects](014-Exercise-Csharp-Auto-Mapping-Objects) | [Auto-Mapping-Objects-Exercises.pdf](014-Exercise-Csharp-Auto-Mapping-Objects/Resources/Auto-Mapping-Objects-Exercises.pdf) · [Auto-Mapping-Objects.pdf](014-Exercise-Csharp-Auto-Mapping-Objects/Resources/Auto-Mapping-Objects.pdf) | [Video](https://youtu.be/Lv3usiUj2QA) |
| 015-Json-Processing | — | [Video](https://youtu.be/8O9BkiFnk6s) |
| [016-Exercise-Json-Processing](016-Exercise-Json-Processing) | [Json-Processing-Exercises.pdf](016-Exercise-Json-Processing/Resources/Json-Processing-Exercises.pdf) · [Json-Processing.pdf](016-Exercise-Json-Processing/Resources/Json-Processing.pdf) | [Video](https://youtu.be/s33jtiBIsHE) |
| 017-Xml-Processing | — | [Video](https://youtu.be/IvzvzXfcCI4) |
| [018-Exercise-Xml-Processing](018-Exercise-Xml-Processing) | [Xml-Processing-Exercises.pdf](018-Exercise-Xml-Processing/Resources/Xml-Processing-Exercises.pdf) · [Xml-Processing.pdf](018-Exercise-Xml-Processing/Resources/Xml-Processing.pdf) | [Video](https://youtu.be/fFZ7-j9denQ) |
| 019-Best-Practices-And-Architecture | — | [Video](https://youtu.be/UgmysQWbhaY) |
| [020-Exercise-Best-Practices-And-Architecture](020-Exercise-Best-Practices-And-Architecture) | [Best-Practices-And-Architecture-Exercise.pdf](020-Exercise-Best-Practices-And-Architecture/Resources/Best-Practices-And-Architecture-Exercise.pdf) · [Best-Practices-And-Architecture.pdf](020-Exercise-Best-Practices-And-Architecture/Resources/Best-Practices-And-Architecture.pdf) | [Video](https://youtu.be/XWLRrUUApj8) |
