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
    public class VeiculoController : ControllerBase
    {

        private readonly EscolaContext _context;
        public VeiculoController(EscolaContext context)
        {
            // construtor
            _context = context;
        }
        [HttpGet]
        public ActionResult<List<Veiculos>> GetAll()
        {
            return _context.Veiculos.ToList();
        }

        [HttpGet("{VeiculoId}")]
        public ActionResult<List<Veiculos>> Get(int VeiculoId)
        {
            try
            {
                var result = _context.Veiculos.Find(VeiculoId);
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
        public async Task<ActionResult> post(Veiculos model)
        {
            try
            {
                _context.Veiculos.Add(model);
                if (await _context.SaveChangesAsync() == 1)
                {
                    //return Ok();
                    return Created($"/api/Veiculo/{model.id}", model);
                }
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
            // retorna BadRequest se não conseguiu incluir
            return BadRequest();
        }

        [HttpPut("{VeiculoId}")]
        public async Task<IActionResult> put(int VeiculoId, Veiculos dadosVeiculoAlt)
        {
            try
            {
                //verifica se existe Veiculo a ser alterado
                var result = await _context.Veiculos.FindAsync(VeiculoId);
                if (VeiculoId != result.id)
                {
                    return BadRequest();
                }
                result.id = dadosVeiculoAlt.id;
                result.modelo = dadosVeiculoAlt.modelo;
                result.ano = dadosVeiculoAlt.ano;
                result.cor = dadosVeiculoAlt.cor;
                result.placa = dadosVeiculoAlt.placa;
                result.nomeMontadora = dadosVeiculoAlt.nomeMontadora;
                result.valor = dadosVeiculoAlt.valor;
                
                await _context.SaveChangesAsync();
                return Created($"/api/Veiculo/{dadosVeiculoAlt.id}", dadosVeiculoAlt);
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }


        [HttpDelete("{VeiculoId}")]
        public async Task<ActionResult> delete(int VeiculoId)
        {
            try
            {
                //verifica se existe Veiculo a ser excluído
                var Veiculo = await _context.Veiculos.FindAsync(VeiculoId);
                if (Veiculo == null)
                {
                    //método do EF
                    return NotFound();
                }
                _context.Remove(Veiculo);
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