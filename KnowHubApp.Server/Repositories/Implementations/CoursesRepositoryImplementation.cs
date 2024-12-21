using KnowHubApp.Server.Data;
using KnowHubApp.Server.Data.Entities;
using KnowHubApp.Server.Repositories.Interfaces;

namespace KnowHubApp.Server.Repositories.Implementations
{
    public class CoursesRepositoryImplementation : ICoursesRepository
    {

        public readonly AppDbContext _appDbContext;

        public CoursesRepositoryImplementation(AppDbContext appDbContext) 
        { 
        
            _appDbContext = appDbContext;

        }

        public async Task<CourseEntity> UploadCourse (CourseEntity courseEntity)
        {
            _appDbContext.Add(courseEntity);
            await _appDbContext.SaveChangesAsync();
            return courseEntity;
        }

    }
}
