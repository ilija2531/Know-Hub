using KnowHubApp.Server.AutoMapper;
using KnowHubApp.Server.Data;
using KnowHubApp.Server.Data.DTOs;
using KnowHubApp.Server.Data.Entities;
using KnowHubApp.Server.Repositories.Interfaces;
using KnowHubApp.Server.Services.Interfaces;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using System.IO;
using AutoMapper;

namespace KnowHubApp.Server.Services.Implementations
{
    public class CoursesServiceImplementation : ICoursesService
    {

        public readonly ICoursesRepository _coursesRepository;
        public readonly IMapper _uploadProfileMapper;

        public CoursesServiceImplementation(ICoursesRepository coursesRepository, IMapper uploadProfileMapper)
        {
            _coursesRepository = coursesRepository;
            _uploadProfileMapper = uploadProfileMapper;
        }

        public async Task<string> UploadCourse(UploadCourseDTO uploadCourseDTO, string userId)
        {

            var courseUniqueName = Guid.NewGuid().ToString() + Path.GetExtension(uploadCourseDTO.CourseFile.FileName);
            var courseVideosFolder = Path.Combine(Directory.GetCurrentDirectory(), "CourseVideos");
            var coursePath = Path.Combine(courseVideosFolder, courseUniqueName);

            using (var fileStream = new FileStream(coursePath, FileMode.Create))
            {
                await uploadCourseDTO.CourseFile.CopyToAsync(fileStream);
            }

            var courseEntity = _uploadProfileMapper.Map<CourseEntity>(uploadCourseDTO);
            courseEntity.CourseEntityId = Guid.NewGuid();
            courseEntity.Path = coursePath;
            courseEntity.Id = userId;

            var saveCourse = await _coursesRepository.UploadCourse(courseEntity);
            return ("Course saved sucessfully");

        }

        public async Task<List<ShowAllDTO>> ShowAll()
        {
            var courses = await _coursesRepository.ShowAll();
            var courseDTO = _uploadProfileMapper.Map<List<ShowAllDTO>>(courses);

            return courseDTO;
        }

        public async Task<string> DeleteCourse(Guid Id)
        {
            await _coursesRepository.DeleteCourse(Id);

            return "Sucessfully Deleted";
        }



        public async Task<UpdatedCourseDTO> UpdateCourse(UpdateCourseDTO updateCourseDTO, Guid id)
        {
            var courseEntity = await _coursesRepository.GetCourseById(id);

            if (updateCourseDTO.CourseFile != null)
            {
                if (!string.IsNullOrEmpty(courseEntity.Path) && File.Exists(courseEntity.Path))
                {
                    File.Delete(courseEntity.Path);
                }
            }

            var newFileName = Guid.NewGuid().ToString() + Path.GetExtension(updateCourseDTO.CourseFile.FileName);
            var courseVideosFolder = Path.Combine(Directory.GetCurrentDirectory(), "CourseVideos");
            var newFilePath = Path.Combine(courseVideosFolder, newFileName);

            using (var fileStream = new FileStream(newFilePath, FileMode.Create))
            {
                await updateCourseDTO.CourseFile.CopyToAsync(fileStream);
            }

            courseEntity.Path = newFilePath;
            courseEntity.Title = updateCourseDTO.Title;
            courseEntity.Description = updateCourseDTO.Description;

            await _coursesRepository.UpdateCourse(courseEntity, id);

            return _uploadProfileMapper.Map<UpdatedCourseDTO>(courseEntity);


        }

        public async Task <List<UserCourses>> GetUserCourses(string id)
        {
            var courses = await _coursesRepository.GetUserCourses(id);

            var courseDTO = _uploadProfileMapper.Map<List<UserCourses>>(courses);

            return courseDTO;


        }

        public async Task <List<SearchedCourses>> SearchCourses(string title)
        {
            var searchedCoursesService = await _coursesRepository.SearchCourses(title);

            var searchedCoursesDTO = _uploadProfileMapper.Map<List<SearchedCourses>>(searchedCoursesService);

            return searchedCoursesDTO;
        }

        public async Task<ProfileDataDTO> GetProfileData(string id)
        {
            var theData = await _coursesRepository.GetUserDetails(id);

            var theDataDTO = _uploadProfileMapper.Map<ProfileDataDTO>(theData);

            return theDataDTO;
        }

        public async Task<ProfileDataDTO> UpdateUserDetails(ProfileDataDTO profileDataDTO, string id)
        {
            var details = await _coursesRepository.GetUserById(id);

            _uploadProfileMapper.Map(profileDataDTO, details);

            await _coursesRepository.UpdateUserDetails(details, id);

            profileDataDTO = _uploadProfileMapper.Map<ProfileDataDTO>(details);

            return profileDataDTO;
        }
    }
}
