using KnowHubApp.Server.Data.Entities;

namespace KnowHubApp.Server.Repositories.Interfaces
{
    public interface ICoursesRepository
    {

        Task<CourseEntity> UploadCourse(CourseEntity courseEntity);
        
        Task<List<CourseEntity>> ShowAll();

        Task<string> DeleteCourse(Guid id);

    }
}
