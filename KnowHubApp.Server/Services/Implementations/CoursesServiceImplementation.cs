using KnowHubApp.Server.Data;
using KnowHubApp.Server.Data.DTOs;
using KnowHubApp.Server.Data.Entities;
using KnowHubApp.Server.Repositories.Interfaces;
using KnowHubApp.Server.Services.Interfaces;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using System.IO;

namespace KnowHubApp.Server.Services.Implementations
{
    public class CoursesServiceImplementation : ICoursesService
    {

        public readonly ICoursesRepository _coursesRepository;

        public CoursesServiceImplementation(ICoursesRepository coursesRepository)
        {
            _coursesRepository = coursesRepository;
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

            var courseEntity = new CourseEntity
            {
                CourseEntityId = Guid.NewGuid(),
                Title = uploadCourseDTO.Title,
                Description = uploadCourseDTO.Description,
                Path = coursePath,
                Id = userId
            };

            var saveCourse = await _coursesRepository.UploadCourse(courseEntity);
            return ("Course saved sucessfully");



        }

        public async Task<List<ShowAllDTO>> ShowAll()
        {
            var courses = await _coursesRepository.ShowAll();
            var courseDTO = courses.Select(c => new ShowAllDTO
            {
                CourseDTOID = c.CourseEntityId,
                Title = c.Title,
                Description = c.Description,
                Path = c.Path,
                FullName = c.UserEntity.FullName
            }).ToList();

            return courseDTO;
        }

        public async Task<string> DeleteCourse(Guid Id)
        {
            _coursesRepository.DeleteCourse(Id);

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

            return new UpdatedCourseDTO
            {
                UpdatedCourseDtoId = courseEntity.CourseEntityId,
                Title = courseEntity.Title,
                Description = courseEntity.Description,
                Path = courseEntity.Path
            };



        }

        public async Task <List<UserCourses>> GetUserCourses(string id)
        {
            var courses = await _coursesRepository.GetUserCourses(id);

            var courseDTO = courses.Select(c => new UserCourses
            {
                CourseDTOID = c.CourseEntityId,
                Title = c.Title,
                Description = c.Description,
                Path = c.Path,
                FullName = c.UserEntity.FullName
            }).ToList();

            return courseDTO;


        }
    }
}
