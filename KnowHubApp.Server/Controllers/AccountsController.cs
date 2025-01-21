using KnowHubApp.Server.Data.DTOs;
using KnowHubApp.Server.Data.Entities;
using KnowHubApp.Server.Repositories.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace KnowHubApp.Server.Controllers
{
    [Route("api/accounts")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly UserManager<UserEntity> _userManager;
        private readonly ITokenService _tokenService;
        private readonly SignInManager<UserEntity> _signInManager;  

        public AccountsController(UserManager<UserEntity> userManager, ITokenService tokenService, SignInManager<UserEntity> signInManager)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _signInManager = signInManager;

        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDTO registerDTO)
        {

            try {

                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var user = new UserEntity
                {
                    FullName = registerDTO.FullName,
                    Email = registerDTO.Email,
                    UserName = registerDTO.UserName

                };

                var createdUser = await _userManager.CreateAsync(user, registerDTO.Password);

                if (createdUser.Succeeded) 
                {

                    var roleResult = await _userManager.AddToRoleAsync(user, "User");
                    if (roleResult.Succeeded) 
                    {
                        return Ok(
                            new NewUserDTO
                            {
                                Id = user.Id,
                                UserName = user.UserName,
                                Email = user.Email,
                                Token = _tokenService.CreateToken(user)
                            }
                            );
                    } 
                    else
                    {
                        return StatusCode(500, roleResult.Errors);
                    }
                }
                else
                {
                    return StatusCode(500, createdUser.Errors);
                }

            } 
            catch (Exception e) 
            {
                return StatusCode(500, e);
            }

        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDTO loginDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName == loginDTO.Username.ToLower());

            if (user == null) return Unauthorized("Invalid User");

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDTO.Password, false);

            if (!result.Succeeded) return Unauthorized("Username not found and/or password incorrect");

            

            return Ok
                (
                new NewUserDTO
                {
                    Id = user.Id,
                    UserName = user.UserName,
                    Email = user.Email,
                    Token = _tokenService.CreateToken(user)

                }
                );



        }


        }
    };
