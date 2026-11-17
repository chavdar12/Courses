using SikuliSharp;

namespace SikuliTests
{
    // Lesson intro: drive the OS Calculator purely by matching images on screen with SikuliX.
    // Put the referenced screenshots in Images/ (button7.png, buttonPlus.png, ...) captured on the test machine.
    public class CalculatorTests
    {
        private ISikuliSession session;

        [SetUp]
        public void Setup()
        {
            session = SikuliRuntime.RequireSession();
        }

        [TearDown]
        public void TearDown()
        {
            session?.Dispose();
        }

        [Test]
        public void Test_AddTwoNumbers()
        {
            session.Click(SikuliRuntime.Image("button7.png"));
            session.Click(SikuliRuntime.Image("buttonPlus.png"));
            session.Click(SikuliRuntime.Image("button5.png"));
            session.Click(SikuliRuntime.Image("buttonEquals.png"));

            // The result "12" appears on the display only if the sum is correct.
            Assert.That(session.Exists(SikuliRuntime.Image("result12.png")), Is.True);
        }
    }
}
