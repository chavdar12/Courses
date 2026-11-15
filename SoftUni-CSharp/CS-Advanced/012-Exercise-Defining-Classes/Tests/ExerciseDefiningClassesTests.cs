using static CS_Advanced.Tests.ProgramRunner;

namespace CS_Advanced.Tests;

public class ExerciseDefiningClassesTests
{
    private const string Module = "012-Exercise-Defining-Classes.";

    [Fact]
    public void Ex001_SpeedRacing() =>
        AssertOutput(
            Module + "Ex001",
            """
            3
            AudiA4 18 0.34
            BMW-M2 33 0.41
            Ferrari-488Spider 50 0.47
            Drive Ferrari-488Spider 97
            Drive Ferrari-488Spider 35
            Drive AudiA4 85
            Drive AudiA4 50
            End
            """,
            """
            Insufficient fuel for the drive
            Insufficient fuel for the drive
            AudiA4 1.00 50
            BMW-M2 33.00 0
            Ferrari-488Spider 4.41 97
            """
        );

    [Fact]
    public void Ex002_CarSalesman() =>
        AssertOutput(
            Module + "Ex002",
            """
            2
            V8-101 220 50
            V4-33 140 28 B
            3
            FordFocus V4-33 1300 Silver
            FordMustang V8-101
            VolkswagenGolf V4-33 Orange
            """,
            """
            FordFocus:
              V4-33:
                Power: 140
                Displacement: 28
                Efficiency: B
              Weight: 1300
              Color: Silver
            FordMustang:
              V8-101:
                Power: 220
                Displacement: 50
                Efficiency: n/a
              Weight: n/a
              Color: n/a
            VolkswagenGolf:
              V4-33:
                Power: 140
                Displacement: 28
                Efficiency: B
              Weight: n/a
              Color: Orange
            """
        );

    [Theory]
    [InlineData("1992 05 31\n2016 06 17", "8783")]
    [InlineData("2016 05 31\n2016 04 19", "42")]
    public void Ex003_DateModifier(string input, string expected) => AssertOutput(Module + "Ex003", input, expected);

    [Fact]
    public void Ex004_OpinionPoll() =>
        AssertOutput(
            Module + "Ex004",
            """
            5
            Niki 33
            Yord 88
            Teo 22
            Lily 44
            Stan 11
            """,
            """
            Lily - 44
            Niki - 33
            Yord - 88
            """
        );

    [Fact]
    public void Ex005_PokemonTrainer() =>
        AssertOutput(
            Module + "Ex005",
            """
            Sam Blastoise Water 18
            Narry Pikachu Electricity 22
            John Kadabra Psychic 90
            Tournament
            Fire
            Electricity
            Fire
            End
            """,
            """
            Narry 1 1
            Sam 0 0
            John 0 1
            """
        );

    [Fact]
    public void Ex006_RawData() =>
        AssertOutput(
            Module + "Ex006",
            """
            4
            ChevroletExpress 215 255 1200 flammable 2.5 1 2.4 2 2.7 1 2.8 1
            ChevroletAstro 210 230 1000 flammable 2 1 1.9 2 1.7 3 2.1 1
            DaciaDokker 230 275 1400 flammable 2.2 1 2.3 1 2.4 1 2 1
            Citroen2CV 190 165 1200 fragile 0.8 3 0.85 2 0.7 5 0.95 2
            flammable
            """,
            """
            ChevroletExpress
            DaciaDokker
            """
        );

    [Fact]
    public void Ex007_SoftUniParking() =>
        AssertOutput(
            Module + "Ex007",
            "",
            """
            Make: Skoda
            Model: Fabia
            HorsePower: 65
            RegistrationNumber: CC1856BG
            Successfully added new car Skoda CC1856BG
            Car with that registration number, already exists!
            Successfully added new car Audi EB8787MN
            Make: Audi
            Model: A3
            HorsePower: 110
            RegistrationNumber: EB8787MN
            Successfully removed EB8787MN
            1
            """
        );

    [Fact]
    public void Ex008_DefineAClassPerson() =>
        AssertOutput(
            Module + "Ex008",
            "",
            """
            Peter 20
            George 18
            Jose 43
            """
        );

    [Fact]
    public void Ex009_CreatingConstructorsChainDefaults() =>
        AssertOutput(
            Module + "Ex009",
            "",
            """
            No name 1
            No name 25
            Peter 20
            """
        );

    [Theory]
    [InlineData("3\nPeter 3\nGeorge 4\nAnnie 5", "Annie 5")]
    [InlineData("5\nSteve 10\nChristopher 15\nAnnie 4\nIvan 35\nMaria 34", "Ivan 35")]
    public void Ex010_OldestFamilyMember(string input, string expected) =>
        AssertOutput(Module + "Ex010", input, expected);
}
