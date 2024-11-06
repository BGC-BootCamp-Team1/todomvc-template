using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using ToDoListApi.Models;
using ToDoListApi.Services;

namespace ToDoListApi.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class ToDoItemsController : ControllerBase
    {
        
        private readonly ILogger<ToDoItemsController> _logger;
        private readonly IToDoItemService _toDoItemService;

        public ToDoItemsController(ILogger<ToDoItemsController> logger, IToDoItemService toDoItemService)
        {
            _logger = logger;
            _toDoItemService = toDoItemService;
        }

        [HttpGet()]
        public async Task<ActionResult<List<ToDoItemDto>>> Get()
        {
            var result = await _toDoItemService.GetAllAsync();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ToDoItemDto>> Get(string id)
        {
            var result = await _toDoItemService.GetByIdAsync(id);
            if (result is null)
            {
                return NotFound();
            }
            
            return Ok(result); 
        }

        [HttpPost()]
        public async Task<ActionResult<ToDoItemDto>> Post(ToDoItemCreateRequestBody createRequest)
        {
            var todoItemDto = new ToDoItemDto {
                Description = createRequest.Description,
                Id = Guid.NewGuid().ToString(),
                Done = createRequest.Done,
                Favorite = createRequest.Favorite
            };
            await _toDoItemService.CreateAsync(todoItemDto);

            return Created("", todoItemDto);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ToDoItemDto>> Put(string id, [FromBody] ToDoItemDto toDoItemDto)
        {
            if (id != toDoItemDto.Id)
            {
                return BadRequest("ToDo Item ID in url must be equal to request");
            }
            else if (await _toDoItemService.GetByIdAsync(id) is null)
            {
                await _toDoItemService.CreateAsync(toDoItemDto);
                return Created("", toDoItemDto);
                
            }
            else
            {
                await _toDoItemService.ReplaceAsync(toDoItemDto);
                return Ok(toDoItemDto);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            var success = await _toDoItemService.DeleteAsync(id);
            return success? NoContent(): NotFound("Resource not Found");
        }
    }
}
