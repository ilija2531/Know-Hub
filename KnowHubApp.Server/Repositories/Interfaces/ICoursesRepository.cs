﻿using KnowHubApp.Server.Data.Entities;

namespace KnowHubApp.Server.Repositories.Interfaces
{
    public interface ICoursesRepository
    {

        Task<List<CourseEntity>> ShowAll();

        Task<CourseEntity> UploadCourse(CourseEntity courseEntity);

        Task<string> DeleteCourse(Guid id);

        Task<CourseEntity> UpdateCourse(CourseEntity courseEntity, Guid id);

        Task<CourseEntity> SpecificCourse(Guid id);

        Task<List<CourseEntity>> GetUserCourses(string id);

        Task<List<CourseEntity>> SearchCourses(string title);

        Task<UserEntity> GetUserDetails(string id);

        Task<UserEntity> UpdateUserDetails (UserEntity userEntity, string id);

        Task<UserEntity> GetUserById(string id);
    }
}
