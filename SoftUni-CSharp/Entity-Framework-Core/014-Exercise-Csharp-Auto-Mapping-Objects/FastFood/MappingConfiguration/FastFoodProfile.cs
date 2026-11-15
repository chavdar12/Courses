using AutoMapper;
using FastFood.Models;
using FastFood.ViewModels;

namespace FastFood.MappingConfiguration;

public class FastFoodProfile : Profile
{
    public FastFoodProfile()
    {
        // Input models only fill part of an entity, so they are validated against the source members.
        CreateMap<CreatePositionInputModel, Position>(MemberList.Source)
            .ForMember(d => d.Name, o => o.MapFrom(s => s.PositionName));
        CreateMap<Position, PositionsAllViewModel>();

        CreateMap<CreateCategoryInputModel, Category>(MemberList.Source)
            .ForMember(d => d.Name, o => o.MapFrom(s => s.CategoryName));
        CreateMap<Category, CategoryAllViewModel>();

        CreateMap<Position, RegisterEmployeeViewModel>()
            .ForMember(d => d.PositionId, o => o.MapFrom(s => s.Id))
            .ForMember(d => d.PositionName, o => o.MapFrom(s => s.Name));
        CreateMap<RegisterEmployeeInputModel, Employee>(MemberList.Source);
        CreateMap<Employee, EmployeesAllViewModel>()
            .ForMember(d => d.Position, o => o.MapFrom(s => s.Position.Name));

        CreateMap<Category, CreateItemViewModel>()
            .ForMember(d => d.CategoryId, o => o.MapFrom(s => s.Id))
            .ForMember(d => d.CategoryName, o => o.MapFrom(s => s.Name));
        CreateMap<CreateItemInputModel, Item>(MemberList.Source);
        CreateMap<Item, ItemsAllViewModels>()
            .ForMember(d => d.Category, o => o.MapFrom(s => s.Category.Name));

        CreateMap<CreateOrderInputModel, Order>(MemberList.Source)
            .ForSourceMember(s => s.ItemId, o => o.DoNotValidate())
            .ForSourceMember(s => s.Quantity, o => o.DoNotValidate())
            .ForMember(d => d.DateTime, o => o.MapFrom(_ => DateTime.Now))
            .ForMember(d => d.OrderItems, o => o.MapFrom(s => new[] { new OrderItem { ItemId = s.ItemId, Quantity = s.Quantity } }));
        CreateMap<Order, OrderAllViewModel>()
            .ForMember(d => d.OrderId, o => o.MapFrom(s => s.Id))
            .ForMember(d => d.Employee, o => o.MapFrom(s => s.Employee.Name));
    }
}
