using SikuliSharp;

namespace ExerciseSikuliWebDesktopTests
{
    // Exercise: drive a web page and a desktop app through screen-image matching only.
    // Capture the referenced screenshots into Images/ on the test machine before running.
    public class WebAndDesktopTests
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
        public void Test_SearchOnWebPage()
        {
            // Assumes a browser is open on the search page.
            session.Click(SikuliRuntime.Image("searchBox.png"));
            session.Type("SikuliX" + "\n");

            Assert.That(session.Wait(SikuliRuntime.Image("searchResults.png"), 10), Is.True);
        }

        [Test]
        public void Test_OpenDesktopAppMenu()
        {
            session.Click(SikuliRuntime.Image("appIcon.png"));
            session.Wait(SikuliRuntime.Image("fileMenu.png"), 10);
            session.Click(SikuliRuntime.Image("fileMenu.png"));

            Assert.That(session.Exists(SikuliRuntime.Image("exitItem.png")), Is.True);
        }
    }
}
