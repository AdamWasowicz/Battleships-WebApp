
namespace BackEnd.Exceptions
{
    public class InvalidMaxTurnsArgumentException : Exception
    {
        public InvalidMaxTurnsArgumentException(string msg = "Max Turns must be 1 or higher") : base(msg)
        {

        }
    }
}
