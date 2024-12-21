using KnowHubApp.Server.Data.DTOs;
using KnowHubApp.Server.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

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

        [HttpPost("uploadCourse")]
        public async Task<IActionResult> UploadCourse([FromBody] UploadCourseDTO uploadCourseDTO)
        {
            if (uploadCourseDTO == null)
            {
                return BadRequest("Course Not Uploaded");
            }

            try
            {
                var course = await _coursesService.UploadCourse(uploadCourseDTO);
                return Ok("Course Uploaded");
            }
            catch (Exception ex) 
            { 
                return StatusCode(500, ex.Message);
            }

        }

    }
}
