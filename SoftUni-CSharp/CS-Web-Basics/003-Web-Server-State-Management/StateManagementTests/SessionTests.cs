using SIS.HTTP.Sessions;

namespace StateManagementTests;

public class SessionTests
{
    [Test]
    public void SessionStoresAndClearsParameters()
    {
        var session = new HttpSession("id");

        session.AddParameter("username", "Pesho");

        Assert.That(session.Id, Is.EqualTo("id"));
        Assert.That(session.ContainsParameter("username"), Is.True);
        Assert.That(session.GetParameter("username"), Is.EqualTo("Pesho"));

        session.ClearParameters();

        Assert.That(session.ContainsParameter("username"), Is.False);
        Assert.That(session.GetParameter("username"), Is.Null);
    }

    [Test]
    public void StorageReturnsTheSameSessionForTheSameId()
    {
        var id = Guid.NewGuid().ToString();
        Assert.That(HttpSessionStorage.ContainsSession(id), Is.False);

        var session = HttpSessionStorage.GetSession(id);

        Assert.That(HttpSessionStorage.GetSession(id), Is.SameAs(session));
        Assert.That(HttpSessionStorage.ContainsSession(id), Is.True);
    }
}
