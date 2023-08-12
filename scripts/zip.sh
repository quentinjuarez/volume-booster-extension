# Get the directory where the shell script is located
scriptDir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

# Navigate up one directory from the script location to reach the repository root
cd "$scriptDir/.."

# Read the version from package.json
version=$(grep -o '"version": *"[^"]*"' package.json | sed 's/"version": *"\(.*\)"/\1/')

# Remove quotes, leading/trailing spaces, and commas from the version
version=$(echo "$version" | tr -d '" ' | tr -d ',')

# Echo the extracted version for testing
echo "Version: $version"

# Get the current date and time
currentDateTime=$(date +"%Y%m%d%H%M%S")

# Format the current date and time as YYYY-MM-DD_HH-MM-SS
currentDate="${currentDateTime:0:4}-${currentDateTime:4:2}-${currentDateTime:6:2}"
currentTime="${currentDateTime:8:2}-${currentDateTime:10:2}-${currentDateTime:12:2}"

# Define other relative paths and file details
distFolder="dist"
buildsFolder="builds"
zipFileName="$buildsFolder/v$version"_"$currentDate"_"$currentTime.zip"

# Create the zip file using the 'zip' command
zip -r "$zipFileName" "$distFolder"

echo "Zip created: $zipFileName"