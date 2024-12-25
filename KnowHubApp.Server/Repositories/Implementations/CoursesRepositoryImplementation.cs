using KnowHubApp.Server.Data;
using KnowHubApp.Server.Data.Entities;
using KnowHubApp.Server.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

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

        public Task<List<CourseEntity>> ShowAll()
        {
            return _appDbContext.Courses.Include(u => u.UserEntity).ToListAsync();
        }

        public async Task<string> DeleteCourse(Guid id)
        {
            var deleteCourse = await _appDbContext.Courses.FirstOrDefaultAsync(d => d.CourseEntityId == id);

            _appDbContext.Courses.Remove(deleteCourse);
            await _appDbContext.SaveChangesAsync();
            return "Course deleted successfully ";
        }

        public async Task<CourseEntity> GetCourseById(Guid id)
        {
            return await _appDbContext.Courses.FirstOrDefaultAsync(c => c.CourseEntityId == id);
        }

        public async Task<CourseEntity> UpdateCourse(CourseEntity courseEntity, Guid id)
        {
            var oldCourse = await _appDbContext.Courses.FirstOrDefaultAsync(c => c.CourseEntityId == id);

            oldCourse.Title = courseEntity.Title;
            oldCourse.Description = courseEntity.Description;
            oldCourse.Path = courseEntity.Path;

            _appDbContext.Entry(oldCourse).State = EntityState.Modified;

            await _appDbContext.SaveChangesAsync();

            return oldCourse;
        }

        public async Task<List<CourseEntity>> GetUserCourses(string id)
        {
            var courses = await _appDbContext.Courses.Where(c => c.Id == id)
                .Include(c => c.UserEntity)
                .ToListAsync();

            return courses;
        }

        public async Task<List<CourseEntity>> SearchCourses(string title)
        {
            var generatedCourses = await _appDbContext.Courses.Where(c => c.Title.ToLower().Contains(title.ToLower()))
                .Include(c => c.UserEntity)
                .ToListAsync();
            return generatedCourses;
        }

        public async Task<UserEntity> GetUserDetails(string id)
        {
            var theUserDetails = await _appDbContext.Users.Where(u => u.Id == id)
                .FirstOrDefaultAsync();

            return theUserDetails;
        }
    }
}
