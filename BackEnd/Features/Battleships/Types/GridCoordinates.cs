namespace Battleships.Types
{
    public struct GridCoordinates
    {
        private char _x;
        private int _y;


        //GET
        public char X { get => _x; }

        public int Y { get => _y; }

       
        //Public methods
        public static bool ValidateParams(string stringCoordinates)
        {
            char X;
            int Y;


            if (stringCoordinates.Length == 0)
                return false;
            if (stringCoordinates.Length > 3)
                return false;


            //X
            try { X = Convert.ToChar(stringCoordinates.Substring(0, 1)[0]); }
            catch { return false; }

            //Y
            try { Y = Convert.ToInt32(stringCoordinates.Substring(1)); }
            catch { return false; }

            //GridCoordinates
            return ValidateParams(X, Y);
        }

        public static bool ValidateParams(char x, int y)
        {
            //X
            if (x.ToString().Length == 0)
                return false;
            if (x < 'A' || x > 'J')
                return false;

            //Y
            if (y.ToString().Length == 0)
                return false;
            if (y.ToString().Length > 2)
                return false;
            if (y <= 0 || y >= 11)
                return false;

            return true;
        }

        public string GetCombinedCoordinatesAsString() => _x.ToString() + _y.ToString();
        

        public GridCoordinates(char x, int y)
        {
            _x = x;
            _y = y;
        }

        public GridCoordinates(GridCoordinates gridCoordinates)
        {
            _x = gridCoordinates.X;
            _y = gridCoordinates.Y;
        }

        public GridCoordinates()
        {
            _x = 'A';
            _y = 1;
        }
    }
}