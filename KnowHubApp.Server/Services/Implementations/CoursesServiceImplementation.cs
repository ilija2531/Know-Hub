using KnowHubApp.Server.Data.DTOs;
using KnowHubApp.Server.Data.Entities;
using KnowHubApp.Server.Repositories.Interfaces;
using KnowHubApp.Server.Services.Interfaces;
using Microsoft.AspNetCore.Http.HttpResults;
using System.IO;

namespace KnowHubApp.Server.Services.Implementations
{
    public class CoursesServiceImplementation : ICoursesService
    {

        public readonly ICoursesRepository _coursesRepository;

        public CoursesServiceImplementation (ICoursesRepository coursesRepository)
        {
            _coursesRepository = coursesRepository;
        }

        public async Task<string> UploadCourse(UploadCourseDTO uploadCourseDTO)
        {

            var courseUniqueName = Guid.NewGuid().ToString() + Path.GetExtension(uploadCourseDTO.CourseFile.FileName);
            var courseVideosFolder = Path.Combine("C:", "Users", "Acer", "OneDrive", "Desktop", "Know-Hub", "KnowHubApp.Server", "CourseVideos");
            var coursePath = Path.Combine(courseVideosFolder, courseUniqueName);

            using (var fileStream = new FileStream (coursePath, FileMode.Create))
            {
                await uploadCourseDTO.CourseFile.CopyToAsync (fileStream);
            }

            var courseEntity = new CourseEntity
            {
                Title = uploadCourseDTO.Title,
                Description = uploadCourseDTO.Description,
                Path = coursePath
            };

            var saveCourse = await _coursesRepository.UploadCourse(courseEntity);
            return ("Course saved sucessfully");



        }

    }
}
