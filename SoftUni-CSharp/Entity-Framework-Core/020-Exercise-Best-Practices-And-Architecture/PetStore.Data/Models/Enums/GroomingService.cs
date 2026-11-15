namespace PetStore.Data.Models.Enums;

[Flags]
public enum GroomingService
{
    None = 0,
    TailTrimming = 1,
    NailTrimming = 2,
    EarCleaning = 4,
    Clipping = 8,
    Bathing = 16,
    FullSet = TailTrimming | NailTrimming | EarCleaning | Clipping | Bathing
}
