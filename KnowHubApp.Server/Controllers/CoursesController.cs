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

    }
}
