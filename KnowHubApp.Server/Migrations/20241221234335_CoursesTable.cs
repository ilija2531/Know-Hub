using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace KnowHubApp.Server.Migrations
{
    /// <inheritdoc />
    public partial class CoursesTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "49d50304-bb4e-4df0-a535-ff823250feac");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b680525d-97a6-439c-a0db-3072c6d6557b");

            migrationBuilder.CreateTable(
                name: "Courses",
                columns: table => new
                {
                    CourseEntityId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Path = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Courses", x => x.CourseEntityId);
                    table.ForeignKey(
                        name: "FK_Courses_AspNetUsers_Id",
                        column: x => x.Id,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "7e8f25af-cd89-401b-909c-32a9c8878c7d", "eb160e3e-af1d-4d69-b424-27c79bf2b485", "User", "USER" },
                    { "bd62cc2d-79e3-48d3-b278-cc54504a9298", "be54d1e9-8f9e-43b0-8927-c33f6dbb4cbb", "Admin", "ADMIN" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Courses_Id",
                table: "Courses",
                column: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Courses");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7e8f25af-cd89-401b-909c-32a9c8878c7d");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "bd62cc2d-79e3-48d3-b278-cc54504a9298");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "49d50304-bb4e-4df0-a535-ff823250feac", "232310ac-e10c-4321-91dd-5e50c430f3cb", "User", "USER" },
                    { "b680525d-97a6-439c-a0db-3072c6d6557b", "7e5af22f-d676-43b2-93bd-c5c2d88a993e", "Admin", "ADMIN" }
                });
        }
    }
}
