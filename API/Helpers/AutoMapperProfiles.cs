using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Helpers;
public class AutoMapperProfiles : Profile
{
    public AutoMapperProfiles()
    {
        CreateMap<AppUser, MemberDto>()
        .ForMember(
            dest => dest.PhotoUrl,
            opt => opt.MapFrom(appUser => appUser.Photos.FirstOrDefault(photo => photo.IsMain).Url)
        ).ForMember(
            dest => dest.Age,
            opt => opt.MapFrom(appUser => appUser.DateOfBirth.CalculateAge())
        );
        CreateMap<Photo, PhotoDto>();
        CreateMap<MemberUpdateDto, AppUser>();
    }
}
