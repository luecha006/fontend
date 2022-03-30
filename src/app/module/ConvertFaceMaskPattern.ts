export class ConvertFaceMaskPattern{

  ConvertAbbreviationToFullName(pattern: string): string{
    let patternFullName = '';
    if(pattern === 'w')
    {
      patternFullName = 'ใส่หน้ากากอนามัยถูกวิธี';
    }
    else if (pattern === 'o')
    {
      patternFullName = 'ไม่ใส่หน้ากากอนามัย'
    }
    else if (pattern === 'm'){
      patternFullName = 'ใส่หน้ากากอนามัยผิดวิธี'
    }
    return patternFullName;
  }

  ConvertAbbreviationToFullNameEnglish(pattern: string): string{
    let patternFullName = '';
    if(pattern === 'w')
    {
      patternFullName = 'wearing a mask';
    }
    else if (pattern === 'o')
    {
      patternFullName = 'not wearing a mask'
    }
    else if (pattern === 'm'){
      patternFullName = 'Wearing a mask the wrong way'
    }
    return patternFullName;
  }
}
