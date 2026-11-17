using SikuliSharp;

namespace ExerciseSikuliMobileTests
{
    // Exercise: drive a phone mirrored on the desktop (e.g. scrcpy / emulator window) by matching its screen images.
    // Capture the referenced screenshots into Images/ from the mirrored device before running.
    public class MobileMirrorTests
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
        public void Test_OpenAppFromHomeScreen()
        {
            session.Wait(SikuliRuntime.Image("appIcon.png"), 10);
            session.DoubleClick(SikuliRuntime.Image("appIcon.png"));

            Assert.That(session.Wait(SikuliRuntime.Image("appHeader.png"), 15), Is.True);
        }

        [Test]
        public void Test_SumatorAddsTwoNumbers()
        {
            session.Click(SikuliRuntime.Image("firstField.png"));
            session.Type("2");
            session.Click(SikuliRuntime.Image("secondField.png"));
            session.Type("5");
            session.Click(SikuliRuntime.Image("sumButton.png"));

            Assert.That(session.Exists(SikuliRuntime.Image("result7.png")), Is.True);
        }
    }
}
