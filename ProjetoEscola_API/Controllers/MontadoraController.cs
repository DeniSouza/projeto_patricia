using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProjetoEscola_API.Data;
using ProjetoEscola_API.Models;


namespace ProjetoEscola_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MontadoraController : ControllerBase
    {

        private readonly EscolaContext _context;
        public MontadoraController(EscolaContext context)
        {
            // construtor
            _context = context;
        }
        [HttpGet]
        public ActionResult<List<Montadora>> GetAll()
        {
            return _context.Montadora.ToList();
        }

        [HttpGet("{MontadoraId}")]
        public ActionResult<List<Montadora>> Get(int MontadoraId)
        {
            try
            {
                var result = _context.Montadora.Find(MontadoraId);
                if (result == null)
                {
                    return NotFound();
                }
                return Ok(result);
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }

        [HttpPost]
        public async Task<ActionResult> post(Montadora model)
        {
            try
            {
                _context.Montadora.Add(model);
                if (await _context.SaveChangesAsync() == 1)
                {
                    //return Ok();
                    return Created($"/api/Montadora/{model.codMontadora}", model);
                }
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
            // retorna BadRequest se não conseguiu incluir
            return BadRequest();
        }

        [HttpPut("{MontadoraId}")]
        public async Task<IActionResult> put(int MontadoraId, Montadora dadosMontadoraAlt)
        {
            try
            {
                //verifica se existe aluno a ser alterado
                var result = await _context.Montadora.FindAsync(MontadoraId);
                if (MontadoraId != result.id)
                {
                    return BadRequest();
                }

                result.codMontadora = dadosMontadoraAlt.codMontadora;
                result.montadora = dadosMontadoraAlt.montadora;
                result.país = dadosMontadoraAlt.país;
                await _context.SaveChangesAsync();
                return Created($"/api/Montadora/{dadosMontadoraAlt.id}", dadosMontadoraAlt);
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }


        [HttpDelete("{montadoraId}")]
        public async Task<ActionResult> delete(int MontadoraId)
        {
            try
            {
                //verifica se existe aluno a ser excluído
                var montadora = await _context.Montadora.FindAsync(MontadoraId);
                if (montadora == null)
                {
                    //método do EF
                    return NotFound();
                }
                _context.Remove(montadora);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }
    }
}
    