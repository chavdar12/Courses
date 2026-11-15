using Microsoft.EntityFrameworkCore;
using P01_StudentSystem.Data;
using P01_StudentSystem.Data.Models;

namespace EntityRelationsTests;

public class StudentSystemTests
{
    private StudentSystemContext context;

    [SetUp]
    public void SetUp() =>
        context = new StudentSystemContext(new DbContextOptionsBuilder<StudentSystemContext>().UseInMemoryDatabase(Guid.NewGuid().ToString()).Options);

    [TearDown]
    public void TearDown() => context.Dispose();

    [Test]
    public void ColumnsFollowTheConstraints()
    {
        var student = context.Model.FindEntityType(typeof(Student))!;
        var phone = student.FindProperty(nameof(Student.PhoneNumber))!;

        Assert.That(student.FindProperty(nameof(Student.Name))!.GetMaxLength(), Is.EqualTo(100));
        Assert.That((phone.GetMaxLength(), phone.IsFixedLength(), phone.IsUnicode(), phone.IsNullable), Is.EqualTo((10, true, false, true)));
        Assert.That(student.FindProperty(nameof(Student.Birthday))!.IsNullable, Is.True);
        Assert.That(context.Model.FindEntityType(typeof(Course))!.FindProperty(nameof(Course.Name))!.GetMaxLength(), Is.EqualTo(80));
        Assert.That(context.Model.FindEntityType(typeof(Resource))!.FindProperty(nameof(Resource.Url))!.IsUnicode(), Is.False);
        Assert.That(context.Model.FindEntityType(typeof(Homework))!.FindProperty(nameof(Homework.Content))!.IsUnicode(), Is.False);
    }

    [Test]
    public void StudentCourseHasCompositeKey()
    {
        var key = context.Model.FindEntityType(typeof(StudentCourse))!.FindPrimaryKey()!;

        Assert.That(key.Properties.Select(p => p.Name), Is.EqualTo(new[] { nameof(StudentCourse.StudentId), nameof(StudentCourse.CourseId) }));
    }

    [Test]
    public void RelationsRoundTrip()
    {
        var student = new Student { Name = "Pesho", RegisteredOn = DateTime.Today };
        var course = new Course { Name = "EF Core", StartDate = DateTime.Today, EndDate = DateTime.Today.AddMonths(2), Price = 100 };
        course.Resources.Add(new Resource { Name = "Slides", Url = "https://example.com", ResourceType = ResourceType.Presentation });
        course.StudentsEnrolled.Add(new StudentCourse { Student = student });
        course.HomeworkSubmissions.Add(new Homework { Student = student, Content = "hw.zip", ContentType = ContentType.Zip, SubmissionTime = DateTime.Now });
        context.Courses.Add(course);
        context.SaveChanges();
        context.ChangeTracker.Clear();

        var loaded = context.Students.Include(s => s.CourseEnrollments).ThenInclude(sc => sc.Course).ThenInclude(c => c.Resources)
            .Include(s => s.HomeworkSubmissions).Single();

        Assert.That(loaded.CourseEnrollments.Single().Course.Name, Is.EqualTo("EF Core"));
        Assert.That(loaded.CourseEnrollments.Single().Course.Resources.Single().ResourceType, Is.EqualTo(ResourceType.Presentation));
        Assert.That(loaded.HomeworkSubmissions.Single().ContentType, Is.EqualTo(ContentType.Zip));
    }
}
