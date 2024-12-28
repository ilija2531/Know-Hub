using AutoMapper;
using KnowHubApp.Server.Data.DTOs;
using KnowHubApp.Server.Data.Entities;
using System.ComponentModel.DataAnnotations;

namespace KnowHubApp.Server.AutoMapper
{
    public class UploadProfile : Profile
    {

        public UploadProfile()
        {
            CreateMap<UploadCourseDTO, CourseEntity>()
                .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.CourseEntityId, opt => opt.Ignore())
                .ForMember(dest => dest.Path, opt => opt.Ignore());

            CreateMap<CourseEntity, ShowAllDTO>()
                .ForMember(dest => dest.CourseDTOID, opt => opt.MapFrom(src => src.CourseEntityId))
                .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.Path, opt => opt.MapFrom(src => src.Path))
                .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.UserEntity.FullName))
                .ReverseMap();

            CreateMap<CourseEntity, UserCourses>()
                .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title))    
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.Path, opt => opt.MapFrom(src => src.Path))
                .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.UserEntity.FullName))
                .ForMember(dest => dest.CourseDTOID, opt => opt.MapFrom(src => src.CourseEntityId)).
                ReverseMap();

            CreateMap<UserEntity, ProfileDataDTO>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.FullName))
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.UserName))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
                .ReverseMap();

            CreateMap<CourseEntity, SearchedCourses>()
                .ForMember(dest => dest.CourseEntityId, opt => opt.MapFrom(src => src.CourseEntityId))
                .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.Path, opt => opt.MapFrom(src => src.Path))
                .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.UserEntity.FullName));
        }

    }
}
