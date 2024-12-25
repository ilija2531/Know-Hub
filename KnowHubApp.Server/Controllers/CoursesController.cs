using KnowHubApp.Server.Data.DTOs;
using KnowHubApp.Server.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace KnowHubApp.Server.Controllers
{
    [Route("api/courses")]
    [ApiController]
    public class CoursesController : ControllerBase
    {

        public readonly ICoursesService _coursesService;

        public CoursesController(ICoursesService coursesService) { 
        
            _coursesService = coursesService;
        }

        [Authorize]
        [HttpPost("uploadCourse")]
        public async Task<IActionResult> UploadCourse([FromForm] UploadCourseDTO uploadCourseDTO)
        {
            if (uploadCourseDTO == null)
            {
                return BadRequest("Course Not Uploaded");
            }

            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                var course = await _coursesService.UploadCourse(uploadCourseDTO, userId);
                return Ok("Course Uploaded");
            }
            catch (Exception ex) 
            { 
                return StatusCode(500, ex.Message);
            }

        }

        [Authorize]
        [HttpGet("fetchCourses")]
        public async Task<List<ShowAllDTO>> ShowAll()
        {
            var fetchedCoureses = await _coursesService.ShowAll();
            
            if (fetchedCoureses == null)
            {
                return new List<ShowAllDTO>();
            } else
            {
                return fetchedCoureses;
            }
        }

        [Authorize]
        [HttpDelete("deleteCourse/{id}")]

        public async Task<string> DeleteCourse(Guid Id)
        {
            _coursesService.DeleteCourse(Id);

            return "Course sucessfully deleted";
        }

        [Authorize]
        [HttpPut("updateCourse/{id}")]
        public async Task<UpdatedCourseDTO> UpdateCourse([FromForm]UpdateCourseDTO updateCourseDTO, [FromRoute] Guid id)
        {
            var updatedCourse = await _coursesService.UpdateCourse(updateCourseDTO, id);
            return updatedCourse;
        }

        [Authorize]
        [HttpGet("fetchUserCourses/{id}")]
        public async Task<List<UserCourses>> GetUserCourses(string id)
        {
            var fetchedCoureses = await _coursesService.GetUserCourses(id);
            return fetchedCoureses;
        }

        [Authorize]
        [HttpGet("searchCourses/{title}")]
        public async Task<List<SearchedCourses>> SearchCourses (string title)
        {
            var fetchedCourses = await _coursesService.SearchCourses(title);

            return fetchedCourses;

        }

    }
}
