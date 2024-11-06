using System.ComponentModel.DataAnnotations;

namespace ToDoListApi.Models
{
    public record ToDoItemCreateRequestBody
    {
        [Required]
        [StringLength(50)]
        public required string Description { get; init; }
        public bool Done { get; init; } = false;
        public bool Favorite { get; init; } = false;
    }
}
